import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { getUsers } from "../../../api/controllers/user";

const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 15px;
    flex-wrap: wrap;
    background-color: #fff;
    padding 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.Input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid  #bbb;
    border-radius: 5pxp;
    height: 40px;
`;

const Label = styled.Label``;

const Button = styled.Button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect(() => {
        if(onEdit) {
            const user = ref.current;

            user.resp.value = onEdit.resp;
            user.tarefa.value = onEdit.tarefa;
            user.datafinal.value = onEdit.datafinal;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;

        if (
            !user.resp.value ||
            !user.tarefa.value ||
            !user.datafinal.value
        ) {
            return toast.warn("Preencha todos os campos!");
        }

        if (onEdit) {
            await axios
                .put("http://localhost:8800/" + onEdit.id, {
                    resp: user.resp.value,
                    tarefa: user.tarefa.value,
                    datafinal: user.datafinal.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        } else {
            await axios 
                .post("http://localhost:8800", {
                    resp: user.resp.value,
                    tarefa: user.tarefa.value,
                    datafinal: user.datafinal.values,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        }

        user.resp.value = "";
        user.tarefa.value = "";
        user.datafinal.value = "";

        setOnEdit(null);
        getUsers();

    };

    return (
        <FormContainer ref={ref}>
            <InputArea>
                <Label>Responsável</Label>
                <Input name="resp" />
            </InputArea>

            <InputArea>
                <Label>Tarefa</Label>
                <Input name="tarefa"/>
            </InputArea>
                
            <InputArea>
                <Label>Data de finalização</Label>
                <Input name="datafinal" type="date" />
            </InputArea>

            <Button type="submit">SALVAR</Button>

        </FormContainer>
    );
};

export default Form;