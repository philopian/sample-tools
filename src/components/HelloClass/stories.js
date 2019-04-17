import React from "react";
import { storiesOf } from "@storybook/react";
import HelloClass from "./HelloClass.js";

const props = {
  message: "hello i'm a message"
};

storiesOf("HelloClass", module) // Title for your component (this will the be heading in the sidebar)
  .addDecorator(story => <div style={{ textAlign: "center" }}>{story()}</div>)
  // subTitle for your component
  .add("without props", () => <HelloClass />)
  .add("with some props", () => <HelloClass {...props} />);
