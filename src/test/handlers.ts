import { http, HttpResponse } from "msw";

const API = "https://sw-api.starnavi.io";

export const handlers = [
  http.get(`${API}/people`, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || "1");
    return HttpResponse.json({
      results: [
        { id: 1, name: "Luke Skywalker", films: [1, 2], starships: [12, 22] },
        { id: 2, name: "Darth Vader", films: [1], starships: [] },
      ],
      next: page < 2 ? `${API}/people/?page=${page + 1}` : null,
      previous: page > 1 ? `${API}/people/?page=${page - 1}` : null,
    });
  }),
  http.get(`${API}/people/:id/`, ({ params }) => {
    if (params.id === "1") {
      return HttpResponse.json({
        id: 1,
        name: "Luke Skywalker",
        films: [1, 2],
        starships: [12, 22],
      });
    }
    return HttpResponse.json({
      id: 2,
      name: "Darth Vader",
      films: [1],
      starships: [],
    });
  }),
  http.get(`${API}/films/:id/`, ({ params }) => {
    const data: Record<string, any> = {
      "1": { id: 1, title: "A New Hope", starships: [12, 22] },
      "2": { id: 2, title: "The Empire Strikes Back", starships: [22] },
    };
    return HttpResponse.json(data[String(params.id)]);
  }),
  http.get(`${API}/starships/:id/`, ({ params }) => {
    const data: Record<string, any> = {
      "12": { id: 12, name: "X-wing", pilots: [1] },
      "22": { id: 22, name: "Imperial shuttle", pilots: [1, 5] },
    };
    return HttpResponse.json(data[String(params.id)]);
  }),
];
