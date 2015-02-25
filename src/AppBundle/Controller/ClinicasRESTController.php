<?php

namespace AppBundle\Controller;

use FOS\RestBundle\Controller\Annotations\QueryParam;
use FOS\RestBundle\Controller\Annotations\RouteResource;
use FOS\RestBundle\Controller\Annotations\View;
use FOS\RestBundle\Request\ParamFetcherInterface;
use FOS\RestBundle\Util\Codes;
use FOS\RestBundle\View\View as FOSView;
use AppBundle\Entity\Clinicas;
use AppBundle\Form\ClinicasType;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Voryx\RESTGeneratorBundle\Controller\VoryxController;

/**
 * Clinicas controller.
 * @RouteResource("Clinicas")
 */
class ClinicasRESTController extends VoryxController
{
    /**
     * Get a Clinicas entity
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @ApiDoc(section="Clinicas")
     *
     * @return Response
     *
     */
    public function getAction(Clinicas $entity)
    {
        return $entity;
    }
    /**
     * Get all Clinicas entities.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @ApiDoc(section="Clinicas")
     *
     * @param ParamFetcherInterface $paramFetcher
     *
     * @return Response
     *
     * @QueryParam(name="offset", requirements="\d+", nullable=true, description="Offset from which to start listing notes.")
     * @QueryParam(name="limit", requirements="\d+", default="20", description="How many notes to return.")
     * @QueryParam(name="order_by", nullable=true, array=true, description="Order by fields. Must be an array ie. &order_by[name]=ASC&order_by[description]=DESC")
     * @QueryParam(name="filters", nullable=true, array=true, description="Filter by fields. Must be an array ie. &filters[id]=3")
     */
    public function cgetAction(ParamFetcherInterface $paramFetcher)
    {
        try {
            $offset = $paramFetcher->get('offset');
            $limit = $paramFetcher->get('limit');
            $order_by = $paramFetcher->get('order_by');
            $filters = !is_null($paramFetcher->get('filters')) ? $paramFetcher->get('filters') : array();

            $em = $this->getDoctrine()->getManager();
            $entities = $em->getRepository('AppBundle:Clinicas')->findBy($filters, $order_by, $limit, $offset);
            if ($entities) {
                return $entities;
            }

            return FOSView::create('Not Found', Codes::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * Create a Clinicas entity.
     *
     * @View(statusCode=201, serializerEnableMaxDepthChecks=true)
     *
     * @ApiDoc(section="Clinicas")
     *
     * @param Request $request
     *
     * @return Response
     *
     */
    public function postAction(Request $request)
    {
        $entity = new Clinicas();
        $form = $this->createForm(new ClinicasType(), $entity, array("method" => $request->getMethod()));
        $this->removeExtraFields($request, $form);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            return $entity;
        }

        return FOSView::create(array('errors' => $form->getErrors()), Codes::HTTP_INTERNAL_SERVER_ERROR);
    }
    /**
     * Update a Clinicas entity.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @ApiDoc(section="Clinicas")
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function putAction(Request $request, Clinicas $entity)
    {
        try {
            $em = $this->getDoctrine()->getManager();
            $request->setMethod('PATCH'); //Treat all PUTs as PATCH
            $form = $this->createForm(new ClinicasType(), $entity, array("method" => $request->getMethod()));
            $this->removeExtraFields($request, $form);
            $form->handleRequest($request);
            if ($form->isValid()) {
                $em->flush();

                return $entity;
            }

            return FOSView::create(array('errors' => $form->getErrors()), Codes::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * Partial Update to a Clinicas entity.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @ApiDoc(section="Clinicas")
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
*/
    public function patchAction(Request $request, Clinicas $entity)
    {
        return $this->putAction($request, $entity);
    }
    /**
     * Delete a Clinicas entity.
     *
     * @View(statusCode=204)
     *
     * @ApiDoc(section="Clinicas")
     *
     * @param Request $request
     * @param $entity
     * @internal param $id
     *
     * @return Response
     */
    public function deleteAction(Request $request, Clinicas $entity)
    {
        try {
            $em = $this->getDoctrine()->getManager();
            $em->remove($entity);
            $em->flush();

            return null;
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
