module.exports = (req, res) => {
  res.writeHead(302,
    {Location: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSjdVXwOE8l6z3PFkwt7IXFU9uPZaVurzT5L-jBzEMYL79d6I1-35Iym437LCfALqeJRjDZrYJ0bZpn/pubhtml?gid=2060937536&single=true'}
  );
  res.end();
}
