import React, { useState, useEffect } from "react";

import httpClient from "../httpClient";

const HomePage = (props) => {
  const [dataList, setDataList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hideCompleted, setHideCompleted] = useState(false);

  useEffect(() => {
    httpClient
      .get("/Todo/Get?hideCompleted=" + hideCompleted)
      .then((response) => {
        setDataList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [hideCompleted]);

  const create = () => {
    httpClient
      .post("/Todo/Create?hideCompleted=" + hideCompleted, {
        title,
        description,
      })
      .then((response) => {
        setDataList(response.data);
        setTitle("");
        setDescription("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const complete = (id) => {
    httpClient
      .post("/Todo/Complete?hideCompleted=" + hideCompleted, { id })
      .then((response) => {
        setDataList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const remove = (id) => {
    httpClient
      .post("/Todo/Delete?hideCompleted=" + hideCompleted, { id })
      .then((response) => {
        setDataList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="form-group">
          <label htmlFor="titleInput">Title</label>

          <input
            type="text"
            className="form-control"
            id="titleInput"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="descInput">Description</label>
          <input
            value={description}
            className="form-control"
            type="text"
            id="descInput"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></input>
        </div>
        <div className="form-group m-2">
          <button type="button" className="btn btn-primary" onClick={create}>
            Submit
          </button>
        </div>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="hideCompletedCheckbox"
          onChange={(e) => {
            setHideCompleted(!hideCompleted);
          }}
        />
        <label className="form-check-label" htmlFor="hideCompletedCheckbox">
          hide completed
        </label>
      </div>

      <br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Create date</th>
            <th>Status</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {dataList.map((dataItem, index) => (
            <tr key={dataItem.id}>
              <td>{dataItem.title}</td>
              <td>{dataItem.dateToDisplay}</td>
              <td>{dataItem.statusText}</td>
              <td>
                {dataItem.status === 0 ? (
                  <button
                    type="button"
                    onClick={() => {
                      complete(dataItem.id);
                    }}
                  >
                    complete
                  </button>
                ) : null}
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => {
                    remove(dataItem.id);
                  }}
                >
                  remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
