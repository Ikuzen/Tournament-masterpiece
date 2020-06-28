const exjwt = require('express-jwt');
export const _secret = "kRRorxJyC1pUVDpFldyGz1jRPt8koOyj1xdHF9zxnvht2D1iwOXZDhBQdOKakJOc"
export const jwtMW = exjwt({
    secret: _secret
});
