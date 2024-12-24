import * as Permission from '#models/permission.js';

export const changePermissions = async (req, res) => {
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



// export const create = async (req, res) => {
//     try {
//           const data = req.body;
//           const role = await Permission.create(data);
//           return res.status(200).send({ message: 'ok', role});
//     }	catch (err) {
//           console.log("Error in create user controller", err.message);
//           res.status(500).send({ error: "Internal Server Error" });
//       }
//   };
  
//   export const update = async (req, res) => {
//     try {
//           const { role_id } = req.params;
//           const { data } = req.body
//           const role = Permission.update(role_id, data)
//           res.status(200).send({ message: 'ok', role});
//       }	catch (err) {
//           console.log("Error in update user controller", err.message);
//           res.status(500).send({ error: "Internal Server Error" });
//       }
//   };
  
//   export const destroy = async (req, res) => {
//     try {
//           const { role_id } = req.params
//           const role = Permission.destroy(role_id)
//           res.status(200).send({ message: 'ok', role});
//       }	catch (err) {
//           console.log("Error in destroy user controller", err.message);
//           res.status(500).send({ error: "Internal Server Error" });
//       }
//   };
  