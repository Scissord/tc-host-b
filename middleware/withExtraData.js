const withExtraData  = (extraData, middleware) => (req, res, next) => {
  middleware(req, res, next, extraData);
};

export default withExtraData;
