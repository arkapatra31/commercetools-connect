import { OrderPagedQueryResponse } from "@commercetools/platform-sdk";
import { apiRoot, projectKey } from "./client/apiClient";

export async function filterOrdersByCustomField(searchTerm: string, limit: number): Promise<OrderPagedQueryResponse> {
    const orders = (await apiRoot.withProjectKey({ projectKey }).orders().search().post(
        {
            body: {
                "query": {
                    "fullText": {
                        "field": "custom.Product_Definition",
                        "value": searchTerm,
                        "customType": "StringType",
                        "mustMatch": "any"
                    }
                },
                limit
            }
        }
    ).execute()).body;

    //Fetch the order IDs from the list of hits from orders in async manner
    const orderIds = await Promise.all(orders.hits.map(async (order) => order.id));

    const orderDetails = await showOrderDetails(orderIds);

    return orderDetails;
}

async function showOrderDetails(orderIds: string[]): Promise<OrderPagedQueryResponse> {

    const whereClause: string = orderIds.length === 1
        ? `id in ("${orderIds[0]}")`
        : `id in (${orderIds.map((id) => `"${id}"`).join(",")})`;


    return (await apiRoot.withProjectKey({ projectKey }).orders().get({
        queryArgs: {
            expand: ["lineItems[*]"],
            where: whereClause
        }
    }).execute()).body;
}