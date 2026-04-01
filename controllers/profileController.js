const db = require('../config/db');


// GET with field filtering (return blood group type)
exports.getProfile = (req, res) => {
  let fields = req.url.split('?')[1];

  // allowed fields from profiles + blood_group
  let allowedFields = ['name', 'email', 'phone', 'gender', 'blood_group'];

  let selectedFields = '*';

  if (fields) {
    const requested = fields.split('+');

    // whitelist validation
    const validFields = requested.filter(f => allowedFields.includes(f));

    if (validFields.length === 0) {
      return res.status(400).send('Invalid fields');
    }

    // handle blood_group separately
    selectedFields = validFields
      .map(f => (f === 'blood_group' ? 'bg.type AS blood_group' : `p.${f}`))
      .join(', ');
  } else {
    // default: select all + blood group
    selectedFields = `p.name, p.email, p.phone, p.gender, bg.type AS blood_group`;
  }

  const query = `
    SELECT ${selectedFields}
    FROM profiles p
    LEFT JOIN blood_groups bg ON p.blood_group_id = bg.id
    WHERE p.user_id = ?
  `;

  db.get(query, [req.user_id], (err, row) => {
    if (err) return res.status(500).send(err.message);
    res.json(row);
  });
};

// POST
exports.createProfile = (req, res) => {
  const { name, email, phone, gender, blood_group_id } = req.body;

  db.run(
    `INSERT INTO profiles(user_id, name, email, phone, gender, blood_group_id)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [req.user_id, name, email, phone, gender, blood_group_id],
    () => res.send('Profile created')
  );
};

// PUT
exports.updateProfile = (req, res) => {
  const { name, email, phone, gender, blood_group_id } = req.body;

  db.run(
    `UPDATE profiles
     SET name=?, email=?, phone=?, gender=?, blood_group_id=?
     WHERE user_id=?`,
    [name, email, phone, gender, blood_group_id, req.user_id],
    () => res.send('Profile updated')
  );
};

// PATCH
exports.patchProfile = (req, res) => {
  const updates = req.body;

  const fields = Object.keys(updates)
    .map(key => `${key}=?`)
    .join(', ');

  const values = Object.values(updates);

  db.run(
    `UPDATE profiles SET ${fields} WHERE user_id=?`,
    [...values, req.user_id],
    () => res.send('Profile patched')
  );
};

// DELETE
exports.deleteProfile = (req, res) => {
  db.run(
    `DELETE FROM profiles WHERE user_id=?`,
    [req.user_id],
    () => res.send('Profile deleted')
  );
};