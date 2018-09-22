import React from "React";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

function Hello(props) {
  return <h1>Hello {props.now}</h1>
}

const moment = new Date(158894664000000)
describe('When Setting up testing', () => {
let result;
  beforeAll(() => {
      result = Hello({now: moment.toISOString})
    })

  it("should fail", () => {
    expect(1 + 1).toBe(2);
  });

  it("return a value", ()=>{
    expect(result).not.toBeNull();
  });

  it("is a h1", () => {
    expect(result.type).toBe("h1");
  });
})
Enzyme.configure({ adapter: new Adapter() })

describe("when testing enzyme", () => {
  it("render a h1", () => {
    const wrapper = shallow(<Hello now={moment.toISOString()} />);
    expect(wrapper.find("h1").length).toBe(1);
  })
})


