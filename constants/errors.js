const ERRORS = {
  // auth
  INVALID_CREDENTIALS: 'Неверно введенные данные!',
  USER_NOT_FOUND: 'Пользователь не найден!',
  INVALID_PASSWORD: 'Неверный пароль!',
  // tokens
  TOKEN_EXPIRED: 'TokenExpiredError',
  NO_ACCESS: 'Unauthorized - No Token Provided',
  INVALID_ACCESS: 'Unauthorized - Invalid Access Token',
  NO_REFRESH: 'Unauthorized - No Refresh Token Provided',
  INVALID_REFRESH: 'Unauthorized - Invalid Refresh Token',
  SESSION_EXPIRED: 'Сессия истекла. Пожалуйста, войдите заново',
  // roles 
  IS_WEBMASTER: 'Данный пользователь является вебмастером!',
  IS_OPERATOR: 'Данный пользователь является оператором!',
  NOT_WEBMASTER: 'Данный пользователь не является вебмастером!',
  NOT_OPERATOR: 'Данный пользователь не является оператором!',
  INVALID_ROLE: 'Неизвестная роль пользователя!',
  // ability
  USER_CANT: 'Пользователь не может выполнить это действие!',
  // fields
  REQUIRED_FIELDS: 'Укажите поля для обновления!',
  REQUIRED_ID: 'Укажите id!',
  REQUIRED_PHONE: 'Укажите телефон!',
  REQUIRED_STATUS: 'Укажите статус!',
  REQUIRED_IS_BLOCKED: 'Укажите состояние блокирования',
  // user
  USER_EXIST: 'Пользователь уже создан!',
  // role
  ROLE_EXIST: 'У пользователя уже есть роль!',
  // permission
  PERMISSION_EXIST: 'У пользователя уже есть этот доступ!',
  // orders
  ORDERS_NOT_FOUND: 'Заказы не найдены!',
};

export default ERRORS;
