import Greeting from './Greeting';
import userEvent from '@testing-library/user-event';
import{ render, screen } from '@testing-library/react';
describe("Greeting component", ()=>{
    test('renders Hello World as a text',()=>{
        //Arrange
        render(<Greeting />);
        //Act nothing..
        //Assert
        const helloWorldElement=screen.getByText('Hello World', {exact:false});
        expect(helloWorldElement).toBeInTheDocument();
    });
    test("Test for 'It's good to see you' text showing if the button is not clicked.",()=>{
        //Arrange
        render(<Greeting />);
        //Act nothing..
        //Assert     
        const outputElementSee=screen.getByText("It's good to see you.", {exact:false});
        expect(outputElementSee).toBeInTheDocument();
    });
    test("Test for 'Changed!' text showing if the button is clicked.",()=>{
        //Arrange
        render(<Greeting />);
        //Act nothing..
        //Assert
        const button=screen.getByRole("button");
        userEvent.click(button);
        const outputElementChanged=screen.getByText("Changed!", {exact:false});
        expect(outputElementChanged).toBeInTheDocument();
    });
    test("Does not render 'It's good to see you' if the button is clicked",()=>{
        render(<Greeting/>);
        const button=screen.getByRole("button");
        userEvent.click(button);
        const outputElementSee=screen.queryByText("It's good to see you.", {exact:false});
        expect(outputElementSee).toBeNull();

    })
})
