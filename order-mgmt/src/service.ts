import { OrderPagedSearchResponse } from "@commercetools/platform-sdk";
import { apiRoot, projectKey } from "./client/apiClient";

export async function filterOrdersByCustomField(searchTerm: string): Promise<OrderPagedSearchResponse> {
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
                }
            }
        }
    ).execute()).body;

    return orders;
}