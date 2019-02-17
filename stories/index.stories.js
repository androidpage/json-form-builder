import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import { ReactJsonForm, EDisplayMode } from '../dist/index';

storiesOf('Welcome', module).add('to Storybook', () => (<Welcome showApp={linkTo('Button')} />));

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ))

storiesOf('React JSON Form', module)
    .add('Basic form', () => {
      return(
        <ReactJsonForm displayMode={ EDisplayMode.normal } definition={{ title: 'Test', fields: [{type: "text", fieldName: "text", label: "Demo Text Input"}] }} />
      )
    })
