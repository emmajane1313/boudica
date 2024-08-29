import { FetchResult } from "@apollo/client";
import {
  RefreshDocument,
  RefreshMutation,
  RefreshRequest,
} from "../../generated";
import { authClient } from "@/lib/lens/client";

const refresh = async (
  request: RefreshRequest
): Promise<FetchResult<RefreshMutation>> => {
  return await authClient.mutate({
    mutation: RefreshDocument,
    variables: {
      request: request,
    },
  });
};

export default refresh;
