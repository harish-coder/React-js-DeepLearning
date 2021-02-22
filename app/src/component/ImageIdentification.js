import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import BarChart from './chart';

class ImageIdentification extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedFile: "",
            names: [],
            scores: []
        }


    };

    validateChart = (res) => {
        const fScores = []
        for (let i = 0; i < res.scores.length; i++) {
            fScores.push(parseFloat(res.scores[i]))
        }
        const cnames = []
        for(let i = 0;i < res.names.length; i++){
            cnames.push(this.toCamelCase(res.names[i].replace('_','  ')))
        }

        this.setState({
            names: cnames,
            scores: fScores
        })
    }

  
    toCamelCase = (str) => {
        return str
            .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
            .replace(/\s/g, '')
            .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
    }

    onChangeHandler = event => {
        var file = event.target.files[0];
        if (this.validateSize(event)) {
            // if return true allow to setState
            this.setState({
                selectedFile: file
            });

        }
    }
    fileUploadHandler = () => {
        const data = new FormData()
        data.append('file', this.state.selectedFile)
        axios.post("http://localhost:5000/predict", data)
            .then(res => { // then print response status
                this.validateChart(res.data)
            })
            .catch(err => { // then print response status
            })

    };
    validateSize = (event) => {
        let file = event.target.files[0];
        let size = 30000;
        let err = '';
        if (file.size > size) {
            err = file.type + 'is too large, please pick a smaller file\n';
            toast.error(err);
        }
        return true
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <form method="post" action="#" id="#">
                            <div className="form-group files">
                                <label>Upload Your File </label>
                                <input type="file" name="file" className="form-control" onChange={this.onChangeHandler} />
                            </div>
                            <div className="col-md-6 pull-right">
                                <button width="100%" type="button" className="btn btn-info" onClick={this.fileUploadHandler}>Upload File</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <BarChart chartList={this.state}></BarChart>
                    </div>
                </div>
            </div>
        )
    }
}

export default ImageIdentification