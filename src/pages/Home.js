import React from 'react'
import {
  FullWidth,
  Spacer,
  Centered
} from '@react-frontend-developer/react-layout-helpers'
import { Button } from 'semantic-ui-react'
import { HeaderBar, Title, Subtitle, Wrapper, Dropzone } from 'components/ui'

class Home extends React.Component {
  state = {}
  onFilesAdded = files => {
    console.log('file:', files[0])
    this.setState({ file: files[0] })
  }

  read = () => {
    if (this.state.file) {
      console.log('File:', this.state.file)
      console.log('Size:', this.state.file.size)
    }
  }

  render() {
    return (
      <FullWidth>
        <HeaderBar>
          <Title>Incognito</Title>
          <Subtitle>File Stream Reader (FileStreamReader)</Subtitle>
        </HeaderBar>
        <Centered>
          <Spacer margin="20px 0 20px 0">
            <Wrapper>
              <Dropzone file={this.state.file} onDrop={this.onFilesAdded} />
            </Wrapper>
          </Spacer>
          <Button secondary onClick={this.read}>
            Read...
          </Button>
        </Centered>
      </FullWidth>
    )
  }
}

export { Home }
