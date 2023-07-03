const StatusCode = new Map([
    ['SUCCESS', 200],
    ['BAD_REQUEST', 400],
    ['UNAUTHORIZED', 401],
    ['NOT_FOUND', 404],
    ['INTERNAL_SERVER_ERROR', 500],
    // api exception
    ['INVAILD_WALLET', 601],
    ['INSUFFICIENT_BALANCE',602],
    ['NOT_FOUND_TRANSACTION',603],
    ['INVAILD_TRANSACTION_TYPE',604],
    // auth exception
    ['INVAILD_TOKEN',610],
    ['INVAILD_MANAGER',611],
    ['VERIFY_TOKEN',612],
    ['EXISTED_USER',613],
    ['INVAILD_USER',614],
  ]);
  
  export default StatusCode;