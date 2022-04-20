describe('Container', () => {
    it('should construct instance of Container', () => {
        const cont = new Container

        expect(cont instanceof Container).toBe(true)
        expect(cont.status).toBe('close')
    })

    it('should assign dimensions', () => {
        const cont = new Container(100, 50, 150)

        expect(cont.width).toBe(100)
        expect(cont.height).toBe(50)
        expect(cont.depth).toBe(150)
    })

    it('should open doors', () => {
        const cont = new Container

        cont.open()
        expect(cont.status).toBe('open')
    })

    it('should close doors', () => {
        const cont = new Container

        cont.close()
        expect(cont.status).toBe('close')
    })

    it('double size', () => {
        const cont = new Container(100, 50, 150)

        cont.doble()
        expect(cont.width).toBe(200)
        expect(cont.height).toBe(100)
        expect(cont.depth).toBe(300)
    })
})