const { defaultFieldResolver } = require('graphql');
const { ensureSignOut } = require('../auth');

function GuestDirective(field, _, __) {
  const { resolve = defaultFieldResolver } = field;

  field.resolve = function (...args) {
    const [, , context] = args;
    ensureSignOut(context.req);

    return resolve.apply(this, args);
  };
}

export default GuestDirective;
