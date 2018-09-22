import React from "react";
import ReactDOM from "react-dom";
import AuthorQuiz from "./AuthorQuiz";
import Enzyme,{ mount, shallow, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({adapter: new Adapter()})

const state= {
  turnData: {
    books: ['The Shining','IT'],
    author: {
      name: 'Charles Dickens',
      imageUrl: 'images/authors/auth1.jpg',
      imageSource: 'wiki',
      books: ['David Copperfield']
    },
  },
  highlight: 'none'
}

describe('Author Quiz', () => {
  it("render without crashing", () => {
      const div = document.createElement("div");
      ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={() => {}}/>, div);
  })

  describe("when no answer is selected", () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={() => {}}/>)
    });

    it("showuld have no background color", ()=> {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('');
    })
  })

  describe("when wrong answer is selected", () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...(Object.assign({},state,{highlight: 'wrong'}))} onAnswerSelected={() => {}}/>)
    });

    it("showuld have red background color", ()=> {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('red');
    })
  })

  describe("when correct answer is selected", () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...(Object.assign({},state,{highlight: 'correct'}))} onAnswerSelected={() => {}}/>)
    });

    it("showuld have green background color", ()=> {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('green');
    })
  })

  describe('When the first answer is selected', () => {
    let wrapper;
    const handleAnswerSelected = jest.fn();

    beforeAll(()=> {
      wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={handleAnswerSelected}/>);
      wrapper.find('.answer').first().simulate('click');
    })

    it('onAnswerselected should be called', ()=> {
      expect(handleAnswerSelected).toHaveBeenCalled();
    });

    it('should recive The Shining', () => {
      expect(handleAnswerSelected).toHaveBeenCalledWith("The Shining")
    });
    
  })
  
})
