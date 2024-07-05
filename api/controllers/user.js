import { db } from "../db.js";

export const getUsers = (_, res) => {
    const q = "SELECT * FROM tarefas";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addUser = (req, res) => {
    const q = "INSERT INTO tarefas('tar_resp', 'tar-tarefa', 'tar_datafinal') VALUES (?)";

    const VALUES = [
        req.body.resp,
        req.body.tarefa,
        req.body.datafinal,
    ];

    db.query(q, [VALUES], (err) => {
        if(err) return res.json(err);
        return res.status(200).json("Tarefa criada com sucesso.");
    });
};

export const updateUser = (req, res) => {
    const q = "UPDATE tarefas SET 'tar_resp' = ?, 'tar_tarefa' = ?, 'tar_datafinal' = ? WHERE 'tar_id' = ?";
    const VALUES = [
        req.body.resp,
        req.body.tarefa,
        req.body.datafinal,
    ];

    db.query(q, [...VALUES, req.params.tar_id], (err) => {
        if(err) return res.json(err);

        return res.status(200).json("Tarefa atualizada com sucesso.");
    });
};

export const deleteUser = (req, res) => {
    const q = "DELETE FROM tarefas WHERE 'tar_id' = ?";

    db.query(q, [req.params.tar_id], (err) => {
        if(err) return res.json(err);

        return res.status(200).json("Tarefa deletada com sucesso.");
    });
};