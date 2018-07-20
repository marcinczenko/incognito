import React from 'react'
import {
  FullWidth,
  Spacer,
  Centered
} from '@react-frontend-developer/react-layout-helpers'
import { Button } from 'semantic-ui-react'
import { HeaderBar, Title, Subtitle, Wrapper, Dropzone } from 'components/ui'
import { FileStreamReader } from 'services/file-reader'

class Home extends React.Component {
  state = {}
  onFilesAdded = files => {
    console.log('file:', files[0])
    this.setState({ file: files[0] })
  }

  onReadProgress = event => {}

  read = () => {
    if (this.state.file) {
      const reader = new FileStreamReader({
        file: this.state.file,
        callback: this.onReadProgress
      })

      reader.read(dataChunk => {
        console.log('Received Data Chunk:', dataChunk)
      })
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
