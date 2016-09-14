Ext.application({
    name: 'GridToolTipDemo',
    launch: function() {
        Ext.create('Ext.data.Store', {
            storeId: 'simpsonsStore',
            fields: ['name', 'email', 'phone'],
            data: {
                'items': [{
                    'name': 'Lisa',
                    "email": "lisa@simpsons.com",
                    "phone": "555-111-1224"
                }, {
                    'name': 'Bart',
                    "email": "bart@simpsons.com",
                    "phone": "555-222-1234"
                }, {
                    'name': 'Homer',
                    "email": "home@simpsons.com",
                    "phone": "555-222-1244"
                }, {
                    'name': 'Marge',
                    "email": "marge@simpsons.com",
                    "phone": "555-222-1254"
                }]
            },
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });

        Ext.create('Ext.grid.Panel', {
            title: 'Simpsons',
            store: Ext.data.StoreManager.lookup('simpsonsStore'),
            columns: [{
                header: 'Name',
                dataIndex: 'name'
            }, {
                header: 'Email',
                dataIndex: 'email'
            }, {
                header: 'Phone',
                dataIndex: 'phone'
            }],
            height: 200,
            width: 400,
            renderTo: Ext.getBody(),
            viewConfig: {
                listeners: {
                    'render': function(view, eOpts) {
                        view.tip = Ext.create('Ext.tip.ToolTip', {
                            target: view.el,
                            delegate: '.x-grid-cell',
                            trackMouse: true,
                            renderTo: Ext.getBody(),
                            listeners: {
                                beforeShow: function(toolTip) {
                                    if (toolTip.triggerElement) {
                                        var triggerEl = toolTip.triggerElement,
                                            column = view.getHeaderByCell(triggerEl),
                                            data = '';

                                        if (Ext.isIE) {
                                            data = triggerEl.innerText;
                                        } else {
                                            data = triggerEl.textContent;
                                        }

                                        if (column) {
                                            var tm = Ext.util.TextMetrics(column.el);
                                            if (tm.getWidth(data) > column.getWidth() - 20) {
                                                toolTip.update(data);
                                                return true;
                                            } else {
                                                return false;
                                            }
                                        }
                                    }
                                }
                            }

                        });
                    }
                }
            }
        });
    }
});
