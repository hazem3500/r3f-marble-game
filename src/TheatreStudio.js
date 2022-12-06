import { getProject } from '@theatre/core'
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'
import { SheetProvider } from '@theatre/r3f'

const sheet = getProject('Marble').sheet('sheet')

function initStudio() {
    studio.initialize()
    studio.extend(extension)
}

function TheatreProvider({ children }) {
    return <SheetProvider sheet={sheet}>{children}</SheetProvider>
}

export { initStudio, TheatreProvider }
