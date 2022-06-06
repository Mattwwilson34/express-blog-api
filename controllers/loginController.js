export function login(req, res) {
  console.log(req.body);
  res.send(JSON.stringify('Successfull post to login', req.body));
}
