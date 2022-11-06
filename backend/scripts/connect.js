function fetch() {
ethereum
  .request({ method: 'eth_accounts' })
  .then((accounts) => {
    console.log(`Accounts:\n${accounts.join('\n')}`);
  })
  .catch((error) => {
    console.error(
      `Error fetching accounts: ${error.message}.
       Code: ${error.code}. Data: ${error.data}`
    );
  })
  return accounts;
};