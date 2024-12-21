import * as AssignedRole from '#models/assigned_role.js';
import * as Role from '#models/role.js';
import * as Permission from '#models/permission.js';
import * as Ability from '#models/ability.js';

export const getUserInfo = async (user) => {
  user.abilities = await getUserAbilities(user.id);
  user.role = await getUserRole(user.id);
  
  return user;
};

export const getUserRole = async (user_id) => {
  const assigned_role = await AssignedRole.findWhere({ entity_id: user_id, entity_type: 'user' });
  return assigned_role.role_id;
};

export const getUserPermissions = async (user_id) => {
  // permissions for role
  let permissions = [];

  const role_id = await getUserRole(user_id);

  const permissionsByRole = await Permission.getWhere({ entity_id: role_id, entity_type: 'role' });
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
