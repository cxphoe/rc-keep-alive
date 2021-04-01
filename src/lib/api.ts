import { globalModel } from "../models/global";

class KeepAliveApi {
  delete(name: string) {
    globalModel.actions.removeNode(name);
  }
}

export default new KeepAliveApi();
