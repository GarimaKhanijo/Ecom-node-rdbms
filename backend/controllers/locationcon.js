const db = require("../config/connection");


exports.getAllLocations = (req, res) => {
    const sql = "SELECT * FROM location";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.addLocation = (req, res) => {
    const { user_id, address, city, postal_code, country } = req.body;
    const sql = `
        INSERT INTO location (user_id, address, city, postal_code, country) 
        VALUES (?, ?, ?, ?, ?)
    `;
    db.query(sql, [user_id, address, city, postal_code, country || 'India'], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Location added successfully", id: result.insertId });
    });
};

exports.getLocationById = (req, res) => {
    const sql = "SELECT * FROM location WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: "Location not found" });
        res.json(result[0]);
    });
};

exports.updateLocation = (req, res) => {
    const { address, city, postal_code, country } = req.body;
    const sql = `
        UPDATE location 
        SET address = ?, city = ?, postal_code = ?, country = ? 
        WHERE id = ?
    `;
    db.query(sql, [address, city, postal_code, country || 'India', req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Location updated successfully" });
    });
};

exports.deleteLocation = (req, res) => {
    const sql = "DELETE FROM location WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Location deleted successfully" });
    });
};