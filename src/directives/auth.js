const { defaultFieldResolver } = require('graphql');
const { ensureSignIn } = require('../auth');

function AuthDirective(field, _, __) {
  const { resolve = defaultFieldResolver } = field;

  field.resolve = function (...args) {
    const [, , context] = args;
    ensureSignIn(context.req);

    return resolve.apply(this, args);
  };
}

export default AuthDirective;
