import {UserMutation} from "../../types.ts";
import React, {useState} from "react";
import {useAppDispatch} from "../../app/hooks.ts";
import {useNavigate} from "react-router-dom";
import {createUser} from "./UserThunks.tsx";
import FormFiles from "../Mini-Components/FormFiles/FormFiles.tsx";

const emptyState:UserMutation = {
    email:"",
    password:"",
    displayName:"",
    image:null,
}

const CreateUser = () => {
    const [newUser, setNewUser] = useState<UserMutation>(emptyState);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    };

    const onSend = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(createUser(newUser)).unwrap();
            navigate('/');
        } catch(error) {
            console.log(error);
        }
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files.length > 0) {
            setNewUser(prevState => ({
                ...prevState,
                [name]: files[0]
            }));
        } else {
            setNewUser(prevState => ({
                ...prevState,
                [name]: null
            }));
        }
    };
    return (
        <>

            <h3 className="mt-5 text-center">Create a account</h3>
            <div className="d-flex justify-content-center ">

                <form onSubmit={onSend}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="text"
                               className="form-control"
                               name="email"
                               id="email"
                               onChange={onChange}
                               value={newUser.email}
                               required
                        />
                    </div>


                    <div className="form-group">
                        <label htmlFor="displayName">display name:</label>
                        <input type="text"
                               className="form-control"
                               name="displayName"
                               id="displayName"
                               onChange={onChange}
                               value={newUser.displayName}
                               required
                        />
                    </div>


                    <div className="form-group mb-3">
                        <label htmlFor="password">password:</label>
                        <input type="password"
                               className="form-control"
                               name="password"
                               id="password"
                               onChange={onChange}
                               value={newUser.password}
                               required
                        />
                    </div>

                    <div className="form-group">
                        <FormFiles
                            name="image"
                            id="image"
                            onChange={fileInputChangeHandler}
                        />
                    </div>

                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-danger">Create</button>
                    </div>

                </form>
            </div>
        </>
    );
};

export default CreateUser;