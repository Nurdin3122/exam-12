import React, {useState} from 'react';
import {PhotoMutation} from "../../types.ts";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../app/hooks.ts";
import FormFiles from "../Mini-Components/FormFiles/FormFiles.tsx";
import {createPhoto} from "./PhotosThunks.ts";

const emptyState:PhotoMutation = {
    name:"",
    image: null,
}

const CreatePhotos = () => {
    const [newPhoto, setNewPhoto] = useState<PhotoMutation>(emptyState);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        if (files) {
            setNewPhoto(prevState => ({
                ...prevState, [name]: files[0]
            }));
        }
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPhoto((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    };

    const onSend = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(createPhoto(newPhoto));
            navigate('/');
        } catch(error) {
            console.log(error);
        }
    };



    return (
        <div className="container-fluid mt-4 ">
            <div className="text-center">
                <h4>Add photo</h4>
            </div>
            <div className="border d-flex justify-content-center p-4 mt-5" style={{borderRadius: "10px" }}>
                <form onSubmit={onSend}>

                    <div className="form-group m-2">
                        <label htmlFor="email" className="form-label">Name:</label>
                        <input type="text"
                               className="form-control"
                               style={{width: "300px"}}
                               name="name"
                               id="name"
                               placeholder="name of photo"
                               onChange={onChange}
                               value={newPhoto.name}
                               required
                        />
                    </div>

                    <div className="form-group mt-3">
                        <span>image:</span>
                        <FormFiles
                            name="image"
                            id="image"
                            onChange={fileInputChangeHandler}
                            value={newPhoto.image}
                        />
                    </div>

                    <div className="d-flex justify-content-center" style={{marginTop: "70px", marginBottom: "10px"}}>
                        <button type="submit" className="btn btn-danger">create</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePhotos;