import React from "react";
var faker = require("faker");
export class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount = () => {
    this.setState({ data: this.loadFromLC() });
    console.log(this.state.data);
  };

  saveToLC = () => {
    localStorage.setObj("data", this.state.data);
  };

  loadFromLC = () => {
    return localStorage.getObj("data") ? localStorage.getObj("data") : [];
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <div>
          <button
            onClick={async () => {
              const newData = [...this.state.data];
              newData.push({
                id: faker.random.uuid(),
                name: faker.name.firstName(),
                email: faker.internet.email(),
                age: faker.random.number()
              });
              await this.setState({ ...this.state, data: newData });
              this.saveToLC();
            }}
          >
            + Add new Row
          </button>
        </div>
        <table className="border">
          <thead>
            <tr className="table-header">
              <td>Id</td>
              <td>Name</td>
              <td>Email</td>
              <td>Age</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((el, index) => {
              return (
                <tr className="table-row" key={index + "elem"}>
                  {Object.keys(el).map((key, index) => {
                    return <td key={key + index}>{el[key]}</td>;
                  })}
                  <td>
                    <button
                      onClick={async () => {
                        await this.setState({
                          ...this.state,
                          data: this.state.data.filter(
                            item => item.id !== el.id
                          )
                        });
                        this.saveToLC();
                      }}
                    >
                      Remove IT BLYAT
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
