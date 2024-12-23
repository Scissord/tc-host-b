import * as AssignedRole from '#models/assigned_role.js';
import * as Role from '#models/role.js';
import * as Permission from '#models/permission.js';
import * as Ability from '#models/ability.js';

export const getUserInfo = async (user) => {
  user.abilities = await getUserAbilities(user.id);
  return user;
};

export const getUserAssignedRole = async (user_id) => {
  const assigned_role = await AssignedRole.findWhere({ entity_id: user_id, entity_type: 'user' });
  if(assigned_role) {
    return assigned_role;
  } else {
    return false;
  }
};

export const getUserPermissions = async (user_id) => {
  let permissions = [];

  const assigned_role = await getUserAssignedRole(user_id);

  const permissionsByRole = await Permission.getWhere({ entity_id: assigned_role.role_id, entity_type: 'role' });
  if(permissionsByRole) {
    permissions = [...permissions, ...permissionsByRole];
  };

  const permissionsByUser = await Permission.getWhere({ entity_id: user_id, entity_type: 'user' });
  if(permissionsByUser.length > 0) {
    permissions = [...permissions, ...permissionsByUser];
  };

  return permissions;
};

export const getUserAbilities = async (user_id) => {
  let abilities = [];

  const permissions = await getUserPermissions(user_id)

  for(const permission of permissions) {
    const ability = await Ability.find(permission.ability_id);
    abilities.push(+ability.id);
  };

  return abilities;
};
