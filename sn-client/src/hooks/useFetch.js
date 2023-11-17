import { useEffect, useState } from "react";
import axios from "axios";

export const useFetch = (url) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, setState] = useState({
    ok: null,
    message: null,
    data: null,
    errors: null,
    isLoading: true,
  });
  const getFetch = async () => {
    if (!url) return;
    else {
      try {
        const { data } = await axios.get(url);
        console.log("🚀 ~ file: userFetch.js:18 ~ getFetch ~ data:", data);
        // const rtaParseada = await response.json();
        setState({ data, isLoading: false, errors: [], message: "Todo ok" });
      } catch (error) {
        console.log("🚀 ~ file: userFetch.js:18 ~ getFetch ~ error:", error);
        setState({
          ok: false,
          message: error.message,
          errors: error,
          isLoading: false,
        });
      }
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!url) return;
    getFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { ...state };
};
