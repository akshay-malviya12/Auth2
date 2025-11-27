# Auth2
# For Register
curl -X POST http://localhost:8080/register -H "Content-Type: application/json" -d "{\"name\":\"user1\",\"email\":\"auth2@example.com\",\"password\":\"123456\"}"

# For Login 
curl -X POST http://localhost:8080/login -H "Content-Type: application/json" -d "{\"email\":\"auth@example.com\",\"password\":\"123456\"}"                                                       {"message":"Login successful","token":" ","refreshToken":""}                                                                                                                                                                            
# For Refresh_Token                                 
curl -X POST http://localhost:8080/refresh-token -H "Content-Type: application/json" -d "{\"email\":\"auth@example.com\",\"refresh_token\":\"\"}"
