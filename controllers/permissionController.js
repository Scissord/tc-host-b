import * as Permission from '#models/permission.js';
import ERRORS from '#constants/errors.js';

export const getByEntity = async (req, res) => {
  try {
    const { entity_id, entity_type } = req.params;
    const permissions = await Permission.getPermissionsWithAbility(entity_id, entity_type)
    res.status(200).send({ message: 'ok', permissions });
  } catch (err) {
    console.log("Error in get permission controller", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export const create = async (req, res) => {
  try {
    const data = req.body;

    const exist_permission = await Permission.findWhere(data);
    if (exist_permission) {
      return res.status(400).send({
        message: ERRORS.PERMISSION_EXIST,
      });
    };

    const permission = await Permission.create(data);

    return res.status(200).send({ message: 'ok', permission });
  } catch (err) {
    console.log("Error in create permission controller", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export const hardDelete = async (req, res) => {
  try {
    const { permission_id } = req.params;
    const permission = await Permission.hardDelete(permission_id);

    res.status(200).send({ message: 'ok', permission });
  } catch (err) {
    console.log("Error in hardDelete permission controller", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export const changeOrderPermissions = async (req, res) => {
  try {
    const { entity_id, entity_type, abilities } = req.body;

    // Получить существующие permissions
    const existingPermissions = await Permission.getWhere({
      entity_id,
      entity_type,
    });

    const existingAbilityIds = existingPermissions.map((perm) => perm.ability_id);

    // Разделяем на добавление и удаление
    const toAdd = [];
    const toDelete = [];

    for (const [ability_id, isVisible] of Object.entries(abilities)) {
      const abilityIdParsed = parseInt(ability_id, 10);

      if (isVisible && !existingAbilityIds.includes(abilityIdParsed)) {
        // Добавить, если не существует
        toAdd.push({
          ability_id: abilityIdParsed,
          is_visible: true,
          entity_id: entity_id,
          entity_type: entity_type,
          created_at: new Date(),
          updated_at: new Date(),
        });
      } else if (!isVisible && existingAbilityIds.includes(abilityIdParsed)) {
        // Удалить, если существует
        toDelete.push(abilityIdParsed);
      }
    }

    // Выполняем добавление и удаление
    if (toAdd.length > 0) {
      await Permission.create(toAdd); // Ожидаем, что create поддерживает массовую вставку
    }

    if (toDelete.length > 0) {
      await Permission.deleteByAbilitiesAndType(toDelete, entity_type, entity_id)
    }

    return res.status(200).send({ message: "Permissions successfully processed." });
  } catch (err) {
    console.error("Error in permissionController:", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
