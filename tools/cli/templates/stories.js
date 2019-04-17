import React from "react";
import { storiesOf } from "@storybook/react";
import ___titleCase___ from "./___titleCase___.js";

const props = {
  message: "hello i'm a message"
};

storiesOf("___titleCase___", module) // Title for your component (this will the be heading in the sidebar)
  .addDecorator(story => <div style={{ textAlign: "center" }}>{story()}</div>)
  // subTitle for your component
  .add("without props", () => <___titleCase___ />)
  .add("with some props", () => <___titleCase___ {...props} />);
