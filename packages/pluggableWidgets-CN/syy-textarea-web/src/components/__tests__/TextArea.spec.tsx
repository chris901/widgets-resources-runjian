import { createElement } from "react";
import { render } from "enzyme";
import { TextAreaComponent, TextAreaProps } from "../TextAreaWeb";

describe("TextAreaWeb", () => {
    let defaultTextAreaProps: TextAreaProps;

    beforeEach(() => {
        defaultTextAreaProps = {
            value: "hello"
        };
    });

    // <TextArea
    //             value={value?.value + ""}
    //             maxLength={maxLength}
    //             allowClear={allowClear}
    //             showCount={showCount}
    //             autoSize={autoSize === true ? { minRows, maxRows } : false}
    //             bordered={bordered}
    //             placeholder={placeholder}
    //             onChange={onChange}
    //             onResize={onResize}
    //             onPressEnter={onPressEnter}
    //         />

    it("renders value", () => {
        const textAreaWrapper = render(<TextAreaComponent {...defaultTextAreaProps} value="hello render hello" />);

        expect(textAreaWrapper).toMatchSnapshot();
    });

    it("render value max than maxLength", () => {
        const textAreaWrapper = render(
            <TextAreaComponent {...defaultTextAreaProps} value="hello render hello" maxLength={5} />
        );

        expect(textAreaWrapper.prop("textContent")).toEqual("hello");
    });

    // it("renders a default icon", () => {
    //     const iconWrapper = render(<Icon {...defaultIconProps} data={undefined} />);

    //     expect(iconWrapper).toMatchSnapshot();
    // });

    // it("doesn't render an icon with an unknown icon data type", () => {
    //     const iconWrapper = render(<Icon {...defaultIconProps} data={{ type: "unknown" } as any} />);

    //     expect(iconWrapper).toMatchSnapshot();
    // });

    // it("doesn't apply an animate class to a glyph icon when animate is false", () => {
    //     const iconWrapper = mount(<Icon {...defaultIconProps} animate={false} />);

    //     expect(iconWrapper.find("span").prop("className")).not.toContain("animate");
    // });

    // it("doesn't apply an animate class to an image icon when animate is false", () => {
    //     const iconWrapper = mount(
    //         <Icon {...defaultIconProps} data={{ type: "image", iconUrl: "icon.url" }} animate={false} />
    //     );

    //     expect(iconWrapper.find("img").prop("className")).not.toContain("animate");
    // });

    // it("doesn't apply an animate class to a default icon when animate is false", () => {
    //     const iconWrapper = mount(<Icon {...defaultIconProps} data={undefined} animate={false} />);
    //     expect(iconWrapper.find("div").prop("className")).not.toContain("animate");
    // });
});
