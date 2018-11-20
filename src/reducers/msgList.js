/**
 * 左侧的消息列表
 */

let initalState = {
    selectedItem: {}, // 当前选择的聊天对象
    list: {
        'group_44': {
            type: 'group',
            msgList: [{
                content: '群消息',
                msgType: '',    // 图文，语音等
                createTime: '2018-01-01 00:00:00',
                sender: '发送者1',
                senderAvatar: 'data:image/jpeg;base64,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',
            }],
            from: {
                id: '44',
                avatar: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHUAdQMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQIDBAUGBwj/xAA6EAABAwIEBAQDBgMJAAAAAAABAAIDBBEFEiExBkFRYRMiMoFxkaEHFEJSwfCx0eEVFiMkM1NykvH/xAAaAQACAwEBAAAAAAAAAAAAAAADBAABAgUG/8QAJREAAgIBBAIBBQEAAAAAAAAAAAECAxEEEiExBRNhFCIyQVFS/9oADAMBAAIRAxEAPwD3FCEKEBQ1craenlmf6Y2Fx+AF1Mszia/93sTy7/dJbf8AUqn0WuzC4O41p8ec6nqA2Cr1LGg6SDt37LrgvmWgrJaSaOaGRzJY3BzHDcEL6E4WxmLHMFpq6MgOe20jR+F43HzQKbXLKYzqKVDEo9GwhCEwKghCFCAhIVm43jdBglKajEJxG38LQLucegCptLstJt4RpoWDwnxEziSjmq4aeSGKOYxMzkXdYA3+q3lE01lEaaeGCEIVlAhCFCAqmLxePhdXCN5IHtHu0q2muFwqfREfNGC4NX4zW/dqCIvcPU46NYO5XsH2eYPX8PCajrXxPjmOdhjcSGuG41HMfwV7DMMpsGfPTUsYY0yuee+Y3WrG4B7XdDdcFauUb8D9snKGDWQmg3Ccu8nkQBIUqrVU3hts31kadlmc4wjukWlkyOKuJqXh6jMkxzzEeSP9T0C8M4i4kqMXqn1FTKXOOgv6WjoAvdnxxeG9sjQ8P1fm1zfFeX0HAjar7QHUwjP9lRAVLr7ZSdI/nf2C5UNUtTZsHqsVRbaPR/s6wx+GcJUEUzcs0jfGkHQu1t8rD2XTJrAA0Ack5ddLCwIyeXkEIQrKG5glzBcRwX98q8JjxDEqueomqLuGaQ5Wt5ADZb7g0dvgbLlT8pCLawH9DTwakk8cfrcB25qF1bGBdrXu+Df5rPja0Hy5vmSpkF+TnJ/aielLsq4nK10rJGRyA7HyH9EyGU3s7S6u2vvso5Ymv5ajmufdmye/9h4tKO006d2eCNw5tBUyp4c7/KsY71MGVw7qy9wazMTovTVzXrUvgSa5I6mdsLMx1J0aBzKyppXkknzEqWVvjzCWS5to1vIJ1h0XE117ue2PQxXHbyzPe5xIDtL6DXcrYw+lZTsLhYvksXuHP/xVS0dE5uZmrCWnsgaO2OnlmSybtzNYRqoVSnqc5DJLB3I9VbXo6rY2x3RFGmgQhCIUcVwvS4nQYDSUlbSSRywsykaHbbZXYqh0xBAcQeZFguhrHZKaV3RpWPSRjL9F5nyGmhVNbX2PVWbk20SQg81MkAASpSL2kbywSpEHZE3oofTPLKkDk8WPxH7KdXSEysiadB5nfp++yrPkyFrvyuB9rqlj2LQYVTVuIVJJjhs0Bu7jYafMp2Gpf0zgu84BbPvNEJVy3BvElXj/AIzqyhFM3KJIHNdcPYTb+K6lKSzDiQV8cCITRI0uLQ4XG4vsnAh2oNx1CHKWUQa/Vp3PwVigrRKwMm/w5hoWu0zdwq8jw0XKiMsUoyOsQeRCPptW6JfBmVe5G3dCyYnSRjLHP5ej/MhdVeUpwA9TJ8WqI46KYOe0Oy6C+pVClkFrKWZrHxOJ2O/dZcJy3jvq3buFx9bqvdNPHQ3TWtrRsjUaKvI+pHogaQefibfRYsM05lyyOfn2O63ocwiaHm7ralATNTr2fsVpIaM2/NNfM0aFxBPNLILsOtvgqErC92r3eyxKWCRjkJ3xUdN5D4jnaF79Setyub4spZsVwKCmpYpHtZMDKGeZxFjr31W5V0k1WDT0/wDqu2J2b3Kjo6eehe6GpsJrctnAcwiw3xj7McBYxgunyUPs+wMYPSVEsjHRvqHizX6ODRt9SV1twVmZ8hz6m3urscl9lh2ubywdkecnF/aRibMOpIaFvjBtXndM+F2V9gNNf+RHsFzn2U4pVw427D5JXup5onHI5xOVw5j2uu44u4dOM/d6mJrHy04I8J5sHg9+oWPwzgRwvFZMQqoRBJkLWxBwJueZtoNE5GyPp2m4xUofJ2lU4FhAJF+azop3udO0xPLYCA6RouNRfbdSfeGyNc+/lG6u4NMIY3h8LwZZC9xGvQD6AJaiELJ4seEZnmuPBz1bxVg1BII6rEImvP4WnNb422QumqsHwHEpPGrsOoZ5RpmmgaXfUIXTXjKcfmB+pX+SXEaUhjnxA23Leiw8jppAwGzuvRdXUSsiYXP26AXusaAMc98oYGF5va1kDymnrjYpRfP8Jp7Wo4JYowxosPmpEAISSwlgtsQjRQubGzUkBTOcADc2Co1AEtgH+r062v8ABDmjUUWGzCEiSM3LeXUcwq72x4hMKuQXu20Yduxv6KqI53TMhYWXebBxJ006JwgqqWdtLmY+zM3iBx69P6osZXehpfjk1sipd8l7wLnRSsYGpsAe0ee/uprXQkkZcn0IAs2twx08rntlLcx2stMKB0rWF29yVp8IkJSi/tMunoS2d0c8g8ON3kaBv3PVa4dHFH2vYlZNZVWkDyQBnyjvf+q1KCkmkyPfZsdw7e5K1RVK2eIo1a8LMmTxgSi7GFwHUIWmB2Qu6vGwS7EfYzOxM5i0tv5LnRZYqS0jXQ8ltTwOc4kWKqTUDX6viB72S2s0k7JuSGKpwisMriqCDUiyccPA9IcPqo3UTuTvoubLS6hfoMnWyOSoGx58ionzFzALbDdWHYcXtsXu9gnNw9uniOe4DltdZWjvka31ohpGuknEnJgtfqT+/qlxCV0MniN3LLA+5/mr7WBoAaAAmTU7ZWFrxcJ76ZqnYge9bsszy6MX8NxEht5r9FbhrGPja46EgGyqzYfJa0b7t2sRqofAnYdI3e2q5s6r48NBVCt85NQVDFFK2OXUkj3sqjWzf7b/AHCljp5n+ryjupGFsnjaVtjHnI6OKNj3OGuwHYBamGlrIcg0F9FUipAOpV+CAtIvoBsuxoNPZXPc0L3OLRcQm2KF3BMUIQhWQLBNytPIIQstIgha3bKEBjfyhCFW1Eyx2VvQfJLlCEK8IgwxtO7R8k0wx/kCVCmyP8Jlh4LANAkETBrZKhVsj/C8seABpZOQhaRQIQhWQ//Z',
                name: '群名',
                members: [],    // 群成员
                creator: '',    // 群主
            },
            to: {
                id: '',
                avatar: '',
                name: '',
                status: 'online'
            },
        },
        'single_2': {
            type: 'single',
            msgList: [{
                content: '11111',
                msgType: '',    // 图文，语音等
                createTime: '2018-01-01 00:00:00',
                sender: '发送者2',
                senderAvatar: 'data:image/jpeg;base64,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',
            }],
            from: {
                id: '2',
                avatar: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIcAtAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUBAwYCB//EAD8QAAEDAgMFBAcFBgcBAAAAAAEAAgMEEQUSIQYTMUFRImFxoVJigZGxwdEHFCMyQjM0cpKi8BYkNUNzgvEV/8QAGQEBAAMBAQAAAAAAAAAAAAAAAAIDBAEF/8QAJREAAgIBBAICAgMAAAAAAAAAAAECEQMEEiExQVEFIhMjMmHB/9oADAMBAAIRAxEAPwD7iiIgCIiAIiIAiLCALW+eJj2MfI0OebNaTq49yq9ocbjwmnuLOnf+RpPme5cPstiUuN7cxOkeZdzHJIXHgLDKAOgu5Z550pqC7LI4m47j6iiwFlaCsIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAKLiFXHQ0ktTKHFsbb5WC5PcBzKlKuqxv6yOL9EQ3h8To35qrNPZBs6lbPlW2YxzdSYnWUUzI3fmdyYOVxyCmfYlSvmqsVxJ2rRlgb4/mPllX0mshjqKSWKVgcxzC1zXC4IsqvYLB4sFwBsEQAEk0kvDkXG3kAvP0n2nz2aZ5P10dKixdLr1LMplERdAREQBEuiAIiIAiIgCIiAIiIAsXWViy4wFlEQGCoEf7xUnnvLf0hT1VNeY8SnhdwcQ8e4D5FYtc6xk4dnuufIISyBhdI/sjo2/Mr1GyURMjEu7a0WGQDh4lR8UxWiwqJs2ITtiY45W3BJJ8At1DW01fTtqKKdk0LuD2G4XlxnOLtFjXFno0mbV1TUk90pHwXk0kwH4NfVMPflePMKVdCbBaY5JVdkKNEctZDpKGTt6sGV3u4eawMXp3SGONsz3g2IbGdD0udFErcdwvD6uOmrq6GCaQdlkjrX+imufEwGUlgFtXcrKa1WSK7O7faNjat5H7rL7S36rBrHjjTTeIyn5oZLgFoBB5rwZH+guPWTrs5tNNTjmH0szYqypFM9wu0TDKCPHgptNV09Q0Op54pR1Y8H4LhftKxCKho6CZzbyGZzQBxLcuvnZcF/iKlHaaWxP9Jr8rr9xGqnj1U+2rRasMZLvk++3WV832KxXairqogaeafDiQHy1gy5W9WuOrvcfEL6O3gV6GOe9WUSjtdGURFYRCIiAyiIgCIiALxI9sbC95s1ouSeQXtRMVa52H1DWC5LCAjBvhlbNCyVl8r2hwuOSocSr6NmKsMhJdTsIu0X1PL2D4qzoHvcJ2m2SOTIwDkAAuRxHC66ad9RSt3jZnuJ7Vi03Oi8v5PK44kl5NekxwnP7uik+0OPGKuqZV4Q2pnoKil3LzTRmS1nXIIAJF9Pcrr7NsOq6KiqZqqGWBsxZlilBDiQNXkHhf5KwweSfDozSNpJJyHEvkD2tY0n9IudbKDWYviOIYk6nwuKeOeAlrogWgN9aRxBFugHLXVY8d5Y0uyeXLtj+NdHU1LJHvhMc27DXXcMt846dy38tVzn/wALEagZq7FBnI4MhBt7T8gFDxGhxuip+xXz1NO03/DOWRvs1zD2qNJdSM9+zlNtaDH6nHZ4JKKsqaE1G8gMMJe0gtAtcDTmNV1OGV5wjZ+kw/EYXPqGRWfGSDkbyaeptYKwwnaJtTAM9NPK9uhfAzM13nx1GnFVmLYfPidRLUUDH3Ns8UgyPZp0Krzt1SN2nlDK1HLwkW+zDMOrqVzIocpiPIlpym9r2PLUf+q6dh1KBculA/53/Vc9s/QVGD7trmh9ROHktzaC2Xif74q93BlOapdvDybwaPZz9q24dRj/AArdFWZM8YrK9j4K6uwfAK90b62hFW2K4bJJme1t+OpKssPwjCaJodQUFJD0dFE0H3qS1oygWFgor2vo3GSEF0R1fCOI72/T5rXgzLyilliGjos8FrhmjnjbJE4OY4XaRzWxbeCAREXQEREBlERAEREAWCLhZWCgIsEDoZ6g5hu5HB4HMG2qpKqvGFOr3S2c1shdEy9r3aCfZe66N7w1pcTYAXJXz/aCnqMcrKmOHMyCJhfKQdTpozxNhfuWDWQhKKcnVEoyrhHVUUWSgia8DO5uZ5HpHU+ZKgwu+7bRBgHZqYCXH1mEW8j5Kzzh8Qc3gRcKul/1qjI5RyE+S8ZKpGldMt8wWHnsG3Ras6F1wQrJ/ZEUiswCFv3QPy6ve5/vJKkYs+OgMNe8hjWPbFK7kWONtfBxBv4rXgJP3MRn80Tixw6EH6WW7HWulw2WKIN3jsuTNwvmFrqGGChH7Hcj54PFLLv8YnvqIo2hh/iJJ+AVq1c9gMzRI5j+w42YGHi0i92n5dyvc4A1IAHVVw3QntkRbT5RvB0Q2UR1UNRBDNOeW7Zp7zYea83xGT9nTxQ98smYj2N+q9PHDJJcIrYeJKOZ08ALonG8sI5+s3v6jn4qxhlZNG2SNwcxwu0jmFAFBWPH42IuaekETWj+rMVJw+jbRQGFj5Hguc68hubk3K9DBHJFVMg6JKIi0HAiIgMoiIAiIgC8vdYXR7g0Ek2A4lc7jGKtOWOMOdvNIo2/ml77dO7nx4KMpUjjdHuvxI1MopqUZnOPYHX1j6oW3B6VsNIbEuMji8uI1dfn7lrpKF9Bh9RNOQ6smb2iOR4NaO75q0jYGRtaOAaAvG1acppMthdWaGxMhiEUYs1vAX4KM6Joqd/+rJkB7r3UuRR5OCzSVFsTwX2Kyx91qcsA2VdllEqCNjHue1oDn2zHrZe5oTLJG4nsNdmI9I8vNa4ncFKabhXRpqiuRy+1DTQ1kVbHmDZdJXD9JFrOUoVr66hirIWh09M/txXsHOA1HtBuD3hetsyW4DUTtaC6Gz+0NLXsb91iVz+z9RG9rRFVDcuIifKRw9F3iL29vcp7XKG2C+y6/wBRFRSe59Ps+hUdTFVwRzwm7Hi46juPet6i0NNFSRbuAWF7uJ1LieZPMqUvcxu4pspffAREUzgREQBERAZRFglALrxLKyJhfI4NaBckm1lX4pjVLhzHb2QF4/Rfh49FStbimOvDrOpqUm+8eNT/AANPxKjJ0RcvCPWK4xNXTijw6F0pOuXhfvd6LfHirLBsGFGXVFU/f10n7SUjRvqt6D4qZh2H09BDu6dlrm7nON3PPUnmpgCg1vOpVyyLXgCJgPDes+KzyWvGbtoJJRe8NpdBe+U3t5LLHh7AWkEEXXm61ftS/ouj0a3FR5XBbpFDmNlgySLYo8OeLrAeFpJuUBVNltcE6N2ikRv1UCNylRngrcbZBoqNv2VU2ymIRUMZfNKzJoQMrf1E37rrgcFra7E9jafJTgMpJzTGVjdJWkXGnUHie8Lv9uJaxuzVTHhzb1U+WFhuAW5jYkX56+9W+HYDQ0GARYPTxZKWOMMsOJPpX631v1Xp6bHvV+imbqNHLbIYjVYZDHFW1H3ilfY5iQdwDe2vEi/Lku/abgFfNTs5JQ4iZ8QjEm+LoY/xOw5mt9ORNyfguzwislayOkrGkStbYPItmANhp1IBPsW+Ele1IohGSjyXCIitOhERAEREBS1W0lDTxucd4QOoy/HVU7MYxbHSWYVTmOnJsZtQ3+cjX/qFPw/ZDDqY56svr5eOaoNxf+HgugbG1oAa0ADgByXd0fBUo5H/ACZR4bs1TU0jZ6o/eagG4Lh2WHuHXvOqvQ2y9BFBxt2yxJLhAIiLtHTTVSRxRPkmcGxtF3l3ABUWCPnZHK2aMMp2n/LkntBnIOHIj+9bq6xChhr4N1PnyhwcCx5aQQbjgoEmAwyAh1XW2PITW+AWPV4J5a2lmNpdmG1dPUFwhmY5zTYgO1B7wtNQFV1Wx0DZ3zsZvJXaGV/af4X4qNLs7UkWdPUlnomokt8Vjfx+T2WqcEyRV1sNMO3Ixp9ZwC0x4tQkgGtpwem9b9VGGzzozdlNHfqGi62jA6l/+y0+ICL4x+ZEvzR9FxTyRyAOje1w6g3XubE6GkANTVwxXOmeQNVVFspK83METR4BT4NkqcNLZ4YHNPFpjaQV2Px0k+yDyxPVU/PVU1a4CaipyXlrfzNdyfbmAOXt1sF0sZDmBzSC0i4I6KnpdmqGljyUxmgaRYthmc1v8t7eStaSnjpKaKnhvu42hrcxubDvW7TYpYk0yqclJ8GwtB77LR90jNUKgt7QGnj1UlYWmiAREXQEREAREQHkCy9IihEBERTAREQBERAEREAsOgSyIuAIiLoCIiAIiIAiIgCIiAIiID//2Q==',
                name: 'John',
                status: 'online'
            },
            to: {
                id: '',
                avatar: '',
                name: '',
                status: 'online'
            },
        },
        'single_3': {
            type: 'single',
            msgList: [{
                content: '22222',
                msgType: '',    // 图文，语音等
                createTime: '2018-01-01 00:00:00',
                sender: '发送者3',
                senderAvatar: 'data:image/jpeg;base64,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',
            }],
            from: {
                id: '3',
                avatar: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHUAvwMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAAAgEFAwYHBP/EADcQAAEDAgMHAgUDAgcBAAAAAAEAAgMEEQUSIQYxMkFRcZETIgdSYYGhFELBM9EWI1NigrHxFf/EABkBAQADAQEAAAAAAAAAAAAAAAABAgMEBf/EACMRAQACAgIDAAIDAQAAAAAAAAABAgMREkEEITEiUSNh8RP/2gAMAwEAAhEDEQA/AO3Na3KNBu6Kcreg8IZwjsmQLlb0HhGVvQeEyEC5G9B4Rkb0HhMhBj9mbLYXteynI08h4Wg/GOsxbCMApsZwSpfBPSVDc+UXD2O0sRzF7LP8OfiBFtVT/p6yIU2Jxtu+MXLXjqD/AAidfpvGRvQeEZG9B4TIRBcjeg8IyN6DwmQgXI3oPCMjeg8JkIFyN6DwjI3oPCZCBcjeg8IyN6DwmQgXI3oPCMjeg8JkIFyt6DwjK3oPCZCBcjeg8JJGgNNgPCypJeEoJZwjsmSs4R2TIBCEIBCEIK3aLC48ZwWrw+YDLPGW9j1XFWU0+AVgp4y6KalOUPabajn913srn3xHwBz3jFKZl7C0wH4KzyfGuOel9shtJHjdLllIbVxj3t6/ULZFwXDa+fDayOrpn5XsN/oR0K7TgmKQ4vh8dVAeIe5vNp6JS3UmSuvcLFC8NfitHh4aauZsYcbC+qxUePYXWuDaesiLibBp9pPlX3CnG2t6WaELFUVEVOwvmkaxo3lxskzpVlQtZrdt8FpSWioMrhyiaXfla5i/xYpsOcCMKnlidoJBIBr2soi0T6hbhMfXSULU9hNr5dsKOStjwqajpGnKySZ4PqnnlA5fVbYFZUIQhAIQhAJJOEp0kvCUEs4R2TJWcI7JkAhCEAhCEAkljZLG6ORocxwsQeYToQcw2p2Imp3SVWFgvg1cYxqWD+VrmCbU1eCxTw0xaWyjXM5tweouur7VTSMwwwQOLHVF4y8b2tykuI+uUFcAxPGDHVGkoacBjDazRYk9+ayjHG/Toi0zXcryrxCqrpXSmdwYTuG+6xtlez95PUHcqyhm1/zHhhcLjObDsendeuWZrBYyRf8AB4efA/khRONbn2vsP2rxLC7CCcOFrCKQktI7cvsvFiWM1mLS+rVzueL8IPtb9LLWnYrEycANcGXtfX3HuP8AxbrszhFNW4hQVsj3mkqJDDK0Hc8glvnUKZp0iLbVEME05aIYZHl24NaTdbfhHw5OJRMfjpMcOdr/AEGH3OtyJ5LoVDhNFQi1PAG/U6nyvdZRWlvsqWyR8hipKaGjp46eliZFDE0NYxosGgcgsyELZiEIQgEIQgEknCnSScJQSzhHZMlZwjsmQCEIQCEKEASlZI14JabgG2ioNrNoI8JpSxhvO8EN+irdgMXdVRy08595cXN/lZzkiLabRimaTZY7bHJhjJswaGPLCSdAHsczX7uC4vRVLcKrZoK7BY6uCWRxkky2nZdtmhpJFgDr9b712L4i5/8ADM7WAkPe1ryOQuuWRmqq2vD8rY2ADMxtnH78vtZVtmrS2pdGLxr5MPOPm1bEy5/znBhJJNxmcPtp+bJzEyRl4n+oRvjfFkf3GpBWd8HpkBt28rN5qGxvmsCzLY7wNfKRas9emU11KqxD9C/AoqOGlmdiH6gufNY5WsAIDR3vc6cluuyBLMHo6Yf1TilOWjnoHXXhhomy2dPEJD84OR33I3+E9AJf/u0NPQxPbLDUNLbuvc3C6KzW+v6a4/Hv7l28KVDVKq4QhCEAhCEAhCEAkk4SnSS8JQSzhHZMlZwjsmQCEKLoJVPtFjcGD0pe/WQ8LVb5lRbVYHHjNE5o0naPYev0Vb716XxxXl+TlGJ4jPila6ed5NzoFdbNzvopmzxC5Guq199JNDWmmewiQOtay6Zsxs8yniZLWi7tC2M7u5XBlpe+opOnoY71pu12XB62TEKmanxHLJHPHwEe0fQD7qi2kwaDB3t/SPDmzXIgt7gOvZXWM4WIBPVxu3vBa0ftutI2hxn1ntIdkkijEYtqXW5rk/k1OPLG7dS6/HiLW/6UnVe4Vz5IDU5JCI3dH6WXsAomi/6uF5/2uvZUFPWvqJslVFdr9GvI1B7/AN1sb8HigoBVPNmZSSDpu5fde9g8a04o128Py/KxUzzufjLFU07WWi95G99rNHlb9s1gdBSsbXQuE80rf6xG4dAuKVuI1JkJY0tiJ3D+y3r4e7YPyx4bMM8Idla+3uDidxURijG9C+ac2GIp/rqSlJnCnMFDzdGQlzBTdBKEIQCEIQCSXhKdJLwlBLdGjsmUDcpQKUjinKRwRMMT5LLA+chPKFWV1R6Q01VLS6KxHbBU0VHNiDK6SMGZvgnqVmlxJjB7pAO5WuYhXSkn3n7LXa2qlN/c7ys+MtOdVnjG1sjovRkZmbc3e3d91p+MVDJWungtm/eB/wBpaonMTrYm5svBK6NpszM5p5Wtl8qlcERbl21jyfx4x6WWBsMhD5A30nOANxc2J32+i6BX4zSV2EjCR6cboRZz3EFpy7rc9VyllQYnZmRusBa11nOKyue/NTgh27W3Jeljz8YiNfHj+R4sZbzbf31Kcda6GpIzB9z7XNXq2dlNNXUMhPtMmZ/kf2VdFUPBDnU7XyDc650WWljkc9pIAAfm0153C58l5tMu7FMUjX6dzixJsgBbI0juvSyrJ5rluH1c12gOdcmwstooq2pjyiS/Y71jqzXdJbkye6zNfdVFFUiUDqrOMFXrLK9Y6eljr706xNWQK7CYSpUclKICV/CUyh25BKEIQQUpTpChDBM32lUdbGTfRbC4XC8c0AdyVWm2lVtMbnRUlVSu19pXQpqDNy0VfPhIdy/ClG3OKijd8pXglo3fKV0iXBAdzV5n4AD+z8IOcOozfhKgUTvlK6Gdnh/p/hQNnh8n4QaHHRuvwle6nonX4StyZs+B+z8L1RYGB+38IKKlDoi0U0XpgbidTfr3VtTxyyuaZCXW3fQfRWkGEhu4Kxgw8N1IAQ2wUMRABsruE+0XWCOEMGi9EQUaTtmCcJQnCspKShCEQFBUoQCEIQCiyEIILQUmRvO5+6EIAxtHJR6bOilCBHRs+UJfSZ8oQhBHpMvwhHpM+UIQgn0mfKEzYmfKhCCRGzomDG9EIQMGN6KQ1o5IQgmw6KUIQCEIQCEIQf/Z',
                name: 'Jack',
                status: 'offline'
            },
            to: {
                id: '',
                avatar: '',
                name: '',
                status: 'online'
            },
        }
    }
}

const msgList = (state = initalState, action) => {
    switch (action.type) {
        case 'GET_LIST':
            return {
                ...state,
            }
        case 'SET_SELECTED_ITEM': 
            return {
                ...state,
                selectedItem: action.selectedItem,
            }
        default:
            return state
    }
}

export default msgList