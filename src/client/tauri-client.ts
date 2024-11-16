import { fetch } from "@tauri-apps/plugin-http";
import queryString from "query-string";

export class Client {
    csrfToken() {
        if (window && window.localStorage) {
            const csrfToken = window.localStorage.getItem("session:csrfToken");
            return csrfToken;
        }
    }

    async action(verb = "get", path: string, data: any = {}) {
        let url = path;
        // OK, lame ass hack, but if the url is a get, we need to code any parameters
        // into the url.  If now, we put them in the body.
        let args = data;
        const token = this.csrfToken();
        if (token) {
            args = { ...{ csrfToken: token}, ...args };
        }
        if (verb.toLowerCase() == "get") {
            const q = queryString.stringify(args);
            // encode the params into the url
            url += "?" + q;
        }
        let req = new Request(new URL(url), {
            method: verb,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        if (verb.toLowerCase() != "get") {
            req = new Request(new URL(url), {
                method: verb,
                body: JSON.stringify(args),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });  
        }
        try {
            const response = await fetch(req);
            const data = await response.json();
            if (data && data.error) {
              throw data.error.message ? data.error.message : data.error;
            }
            return data;
        } catch (error: any) {
            if (error.response && error.response.status === 501) {
              // 501 error indicates bad login credentials.  Cookie timed out etc
              // Clear out our cookie
              window.localStorage.clear();
            }
            if (error.response && error.response.data && error.response.data.error) {
              throw new Error(
                error.response.data.error.message ? error.response.data.error.message : error.response.data.error
              );
            } else {
              throw error;
            }
        }
    }
}