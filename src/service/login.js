const BASE_URL_LOGIN = "http://192.168.1.5:80/misportal/";

export const loginApi = async (url, method, body, statusCode, token = null, loader = false) => {

        fetch(BASE_URL_LOGIN.concat(url),{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: body ? JSON.stringify(body) : null
            })

            .then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson);

            })
            .catch((error) =>{
            console.error(error);
          });


}

export const api = async (url, method, body = null, headers = {}) => {

    try {
      const endPoint = BASE_URL.concat(url);
      const reqBody = body ? JSON.stringify(body) : null;

      const fetchParams = {method, headers};

      if((method === "POST" || method === "PUT") && !reqBody) {
          throw new Error("Request body required");
      }


      if(reqBody) {
          fetchParams.headers["Content-type"] = "application/json";
          fetchParams.headers["Access-Control-Allow-Origin"] = "*";
          fetchParams.mode =  'cors';
          fetchParams.body = reqBody;
      }

      const fetchPromise = fetch(endPoint, fetchParams);
      const timeOutPromise = new Promise((resolve, reject) => {
          setTimeout(() => {
              reject("Request Timeout");
          }, 3000);
      });

      const response = await Promise.race([fetchPromise, timeOutPromise]);

      return response;
    } catch (e) {
      return e;
    }
}

export const fetchApi = async (url, method, body, statusCode, token = null, loader = false) => {
    try {
        const headers = {}
        const result = {
            token: null,
            success: false,
            responseBody: null
        };
        if(token) {
            headers["x-auth"] = token;
        }

        const response = await api(url, method, body, headers);

        console.log("Response:::"+JSON.stringify(response));

        if(response.status === statusCode) {
            result.success = true;

            if(response.headers.get("x-auth")) {
                result.token = response.headers.get("x-auth");
            }

            let responseBody;
            const responseText = await response.json();

            try {
                responseBody = JSON.parse(responseText);
            } catch (e) {
                responseBody = responseText;
            }

            result.responseBody = responseBody;
            return result;

        }

        let errorBody;
        const errorText = await response.json();

        try {
            errorBody = JSON.parse(errorText);
        } catch (e) {
            errorBody = errorText;
        }

        result.responseBody = errorBody;

        console.log(result);

        throw result;
    } catch (error) {
        return error;
    }
}
