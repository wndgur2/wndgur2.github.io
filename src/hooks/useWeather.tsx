import useSWR from "swr";

function useWeather() {
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data, error, isLoading } = useSWR("https://www.naver.com", fetcher);

    return { data, error, isLoading };
}

export default useWeather;