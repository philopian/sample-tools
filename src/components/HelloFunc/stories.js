import React from "react";
import { storiesOf } from "@storybook/react";
import HelloFunc from "./HelloFunc.js";

const props = {
  message: "hello i'm a message"
};

storiesOf("HelloFunc", module) // Title for your component (this will the be heading in the sidebar)
  .addDecorator(story => <div style={{ textAlign: "center" }}>{story()}</div>)
  // subTitle for your component
  .add("without props", () => <HelloFunc />)
  .add("with some props", () => <HelloFunc {...props} />);
