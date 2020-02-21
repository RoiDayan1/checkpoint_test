import REST, {RESTMethod} from "../helpers/REST";
import {ApiGetBooksParams, ApiGetBooksResponse} from "./Api.models";

class Api extends REST {
  
  static getBooks(search: string, params: ApiGetBooksParams = {}): Promise<ApiGetBooksResponse> {
    params.q = search;
    return REST.request('/volumes', RESTMethod.GET, params);
  }
  
}

export default Api;