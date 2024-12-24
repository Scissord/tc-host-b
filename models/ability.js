import knex from './knex.js';
import repository from './repository.js';

const db = knex();

const abilityRepository = repository('ability');

export const get = async () => {
  return await abilityRepository.getAll();
};

export const getWhere = async (query) => {
  return await abilityRepository.getWhere(query);
};

export const create = async (data) => {
  return await abilityRepository.create(data);
};

export const update = async (id, data) => {
  return await abilityRepository.update(id, data);
};

export const hardDelete = async (id) => {
  return await abilityRepository.hardDelete(id);
};

export const find = async (id) => {
  return await abilityRepository.find(id);
};

export const findWhere = async function (query) {
  return await abilityRepository.findWhere(query);
};

export const getAbilitiesByPermission = async (entity_id, entity_type) => {
	try {
	  const abilities = await db('ability')
		.leftJoin('permission', 'ability.id', 'permission.ability_id')
		.select(
		  'ability.id as ability_id',
		  'ability.title as ability_title',
		  'permission.id as permission_id',
		  'permission.entity_id',
		  'permission.entity_type',
		  'permission.created_at',
		  'permission.updated_at'
		)
		.where((builder) => {
		  builder
			.where('permission.entity_id', entity_id)
			.andWhere('permission.entity_type', entity_type)
			.orWhereNull('permission.entity_id');
		});
  
	  return abilities;
	} catch (err) {
	  console.error('Error in getPermissionsWithAbility:', err.message);
	  throw new Error('Failed to fetch records.');
	}
  };