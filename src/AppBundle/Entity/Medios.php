<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Medios
 *
 * @ORM\Table(name="medios", indexes={@ORM\Index(name="media_case_id", columns={"media_case_id"})})
 * @ORM\Entity
 */
class Medios
{
    /**
     * @var integer
     *
     * @ORM\Column(name="media_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $mediaId;

    /**
     * @var string
     *
     * @ORM\Column(name="media_mime_type", type="string", length=20, nullable=false)
     */
    private $mediaMimeType;

    /**
     * @var string
     *
     * @ORM\Column(name="media_attached_file", type="text", nullable=false)
     */
    private $mediaAttachedFile;

    /**
     * @var string
     *
     * @ORM\Column(name="media_attachment_metadata", type="text", nullable=false)
     */
    private $mediaAttachmentMetadata;

    /**
     * @var \Casos
     *
     * @ORM\ManyToOne(targetEntity="Casos")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="media_case_id", referencedColumnName="case_id")
     * })
     */
    private $mediaCase;



    /**
     * Get mediaId
     *
     * @return integer 
     */
    public function getMediaId()
    {
        return $this->mediaId;
    }

    /**
     * Set mediaMimeType
     *
     * @param string $mediaMimeType
     * @return Medios
     */
    public function setMediaMimeType($mediaMimeType)
    {
        $this->mediaMimeType = $mediaMimeType;

        return $this;
    }

    /**
     * Get mediaMimeType
     *
     * @return string 
     */
    public function getMediaMimeType()
    {
        return $this->mediaMimeType;
    }

    /**
     * Set mediaAttachedFile
     *
     * @param string $mediaAttachedFile
     * @return Medios
     */
    public function setMediaAttachedFile($mediaAttachedFile)
    {
        $this->mediaAttachedFile = $mediaAttachedFile;

        return $this;
    }

    /**
     * Get mediaAttachedFile
     *
     * @return string 
     */
    public function getMediaAttachedFile()
    {
        return $this->mediaAttachedFile;
    }

    /**
     * Set mediaAttachmentMetadata
     *
     * @param string $mediaAttachmentMetadata
     * @return Medios
     */
    public function setMediaAttachmentMetadata($mediaAttachmentMetadata)
    {
        $this->mediaAttachmentMetadata = $mediaAttachmentMetadata;

        return $this;
    }

    /**
     * Get mediaAttachmentMetadata
     *
     * @return string 
     */
    public function getMediaAttachmentMetadata()
    {
        return $this->mediaAttachmentMetadata;
    }

    /**
     * Set mediaCase
     *
     * @param \AppBundle\Entity\Casos $mediaCase
     * @return Medios
     */
    public function setMediaCase(\AppBundle\Entity\Casos $mediaCase = null)
    {
        $this->mediaCase = $mediaCase;

        return $this;
    }

    /**
     * Get mediaCase
     *
     * @return \AppBundle\Entity\Casos 
     */
    public function getMediaCase()
    {
        return $this->mediaCase;
    }
}
