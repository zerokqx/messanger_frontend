import { http, HttpResponse } from 'msw';

export const handlers = [
  http.options('*', () => {
    return new HttpResponse(null, {
      status: 200,
      headers: {
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
        'access-control-allow-headers': '*',
      },
    });
  }),
  http.post('*/v1/auth/login/password', () => {
    return HttpResponse.json(
      {
        data: {
          access_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IllvYmJsZSIsImlhdCI6MTczOTU3MTIwMCwiZXhwIjoyMDY1MTM5MjAwLCJyb2xlIjoiYWRtaW4ifQ.u_V8X1F8Y2J_Hn9K2_v7Z9f-W3u4D6x-P8j9L0m1n2o',
        },
      },
      { status: 200 }
    );
  }),
];
