import React from "react";
import axios from "axios";
import styled from "styled-components";
import{ FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.Table`
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-width: 800px;
    margin: 20px auto;
    word-break: break-all;
`;
export const Thead = styled.Thead``;

export const Tbody = styled.Tbody``;

export const Tr = styled.Tr``;

export const Th = styled.Th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;

    @media (max-width: 500px){
        ${(props) => props.onlyweb && "display: none"}
        }
`;

export const Td = styled.Td`
    padding-top: 15px;
    text-align: ${(props) => (props.alignCenter ? "center" : "start")};
    width: ${(props) => (props.width ? props.width : "auto")};

    @media (max-width: 500px) {
        ${(props) => props.onlyweb && "display: none"}
    }
`;

const Grid = ({ users, setUsers, setOnEdit }) => {
    const handleEdit = (item) => {
        setOnEdit(item);
    };

    const handleDelete = async (id) => {
        await axios
            .delete("http://localhost:8800/" + id)
            .then(({ data }) => {
                const newArray = users.filter((user) => user.id !== id);

                setUsers(newArray);
                toast.success(data);
            })
            .catch(({ data }) => toast.error(data));

        setOnEdit(null);
    };

    return (
        <Table>
            <Thead>
                <tr>
                    <Th>Responsável</Th>
                    <Th>Tarefa</Th>
                    <Th onlyweb>Data de finalização</Th>
                    <Th></Th>
                    <Th></Th>
                </tr>
            </Thead>
            <Tbody>
                {users.map((item, i) => (
                    <Tr key={i}>
                        <Td width="30%">{item.tar_resp}</Td>
                        <Td width="30%">{item.tar_tarefa}</Td>
                        <Td width="20%">{item.tar_datafinal}</Td>
                        <Td alignCenter width="5%">
                            <FaEdit onClick={() => handleEdit(item)} />
                        </Td>
                        <Td alignCenter width="5%">
                            <FaTrash onClick={() => handleDelete(item.tar_id)} />
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default Grid;