import * as AssignedRole from '#models/assigned_role.js';
import * as Role from '#models/role.js';
import * as Permission from '#models/permission.js';
import * as Ability from '#models/ability.js';

export const getUserInfo = async (user) => {
  user.abilities = await getUserAbilities(user.id);
  user.roles = await getUserRoles(user.id);

  return user;
};

export const getUserRoles = async (user_id) => {
  let roles = [];

  const assigned_roles = await AssignedRole.getWhere({ entity_id: user_id, entity_type: 'user' });
  for(const assigned_role of assigned_roles) {
    const role = await Role.find(assigned_role.role_id);
    if(role) {
      roles.push(role);
    }
  };

  return roles;
};

export const getUserPermissions = async (user_id) => {
  let permissions = [];

  const roles = await getUserRoles(user_id);

  if(roles.length > 0) {
    for(const role of roles) {
      const permissionsByRole = await Permission.getWhere({ entity_id: role.id, entity_type: 'role' });
      if(permissionsByRole) {
        permissions = [...permissions, ...permissionsByRole];
      };
    };
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
