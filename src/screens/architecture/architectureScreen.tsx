import * as UECA from "ueca-react";
import { ScreenBaseModel, ScreenBaseParams, ScreenBaseStruct, useScreenBase, Col, Row, IconButtonModel, useIconButton } from "@components";
import { Breadcrumb, CRUDScreenModel, useCRUDScreen } from "@core";

type ArchitectureScreenStruct = ScreenBaseStruct<{
    props: {
        scale: number;
    };

    children: {
        crudScreen: CRUDScreenModel;
        zoomInButton: IconButtonModel;
        zoomOutButton: IconButtonModel;
    };

    methods: {
        zoomIn: () => void;
        zoomOut: () => void;
    };
}>;

type ArchitectureScreenParams = ScreenBaseParams<ArchitectureScreenStruct>;
type ArchitectureScreenModel = ScreenBaseModel<ArchitectureScreenStruct>;

function useArchitectureScreen(params?: ArchitectureScreenParams): ArchitectureScreenModel {
    const struct: ArchitectureScreenStruct = {
        props: {
            id: useArchitectureScreen.name,
            scale: 1,
        },

        children: {
            zoomInButton: useIconButton({
                iconView: () => (
                    <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                    </svg>
                ),
                title: "Zoom In",
                onClick: () => model.zoomIn(),
                size: "medium"
            }),

            zoomOutButton: useIconButton({
                iconView: () => (
                    <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 13H5v-2h14v2z" />
                    </svg>
                ),
                title: "Zoom Out",
                onClick: () => model.zoomOut(),
                size: "medium"
            }),

            crudScreen: useCRUDScreen({
                intent: "none",
                breadcrumbs: () => _breadCrumbs(),
                contentView: () => (
                    <Col
                        fill
                        overflow="auto"
                        padding={{ top: "medium", leftRight: "large" }}
                        sx={{ position: "relative" }}
                    >
                        <img
                            src="ueca_app_diagram.svg"
                            alt="UECA App Architecture Diagram"
                            style={{
                                width: "100%",
                                height: `${model.scale * 100}%`,
                                transition: "height 0.2s ease-in-out"
                            }}
                        />
                        <Row
                            spacing="tiny"
                            padding="tiny"
                            zIndex={1000}
                            backgroundColor="background.paper"
                            border="rounded"
                            sx={{
                                position: "fixed",
                                bottom: "16px",
                                right: "16px",
                                opacity: 0.95,                                
                                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)"
                            }}
                        >
                            <model.zoomOutButton.View />
                            <model.zoomInButton.View />
                        </Row>
                    </Col>
                )
            }),
        },

        methods: {
            zoomIn: () => {
                if (model.scale < 3) {
                    model.scale = Math.round((model.scale + 0.25) * 100) / 100;
                }
            },
            zoomOut: () => {
                if (model.scale > 0.5) {
                    model.scale = Math.round((model.scale - 0.25) * 100) / 100;
                }
            }
        },

        View: () => <model.crudScreen.View />
    };

    const model = useScreenBase(struct, params);
    return model;

    // Private methods
    function _breadCrumbs(): Breadcrumb[] {
        return [
            { route: { path: "/" }, label: "Home" },
            { route: { path: "/architecture" }, label: "Architecture" }
        ];
    }
}

const ArchitectureScreen = UECA.getFC(useArchitectureScreen);

export { ArchitectureScreenModel, useArchitectureScreen, ArchitectureScreen };
